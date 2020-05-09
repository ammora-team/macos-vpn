#import "VPNManager.h"

@implementation VPNManagerProtocol

+ (NSString *)IKEV2 { return @"ikev2"; }

@end

@interface VPNManager()
@property NSDictionary *configuration;
@end

@implementation VPNManager

NEVPNManager *vpnManager;

- (id) initWithConfiguration:(NSDictionary*) configuration {
    if (self = [super init]) {
        [self setConfiguration:configuration];
    }

    vpnManager = [NEVPNManager sharedManager];

    NSString *p = [configuration objectForKey:@"protocol"];

    if ([p isEqualToString:VPNManagerProtocol.IKEV2]) {
        self.protocol = [self createProcolIKEv2];
    }

    return self;
}

- (id) initWithJson:(NSString *) jsonString {
    NSData *data = [jsonString dataUsingEncoding:NSUTF8StringEncoding];
    id json = [NSJSONSerialization JSONObjectWithData:data options:0 error:nil];

    return [self initWithConfiguration:json];
}

- (void) connect:(NSString*)userName password:(NSString*)password {
    [self installProfile:userName password:password];
}

- (bool) disconnect {
    return true;
}

- (NEVPNProtocolIKEv2*)createProcolIKEv2 {
    NEVPNProtocolIKEv2 *p = [[NEVPNProtocolIKEv2 alloc] init];

    p.authenticationMethod = NEVPNIKEAuthenticationMethodNone;

    p.serverAddress = [self.configuration objectForKey:@"server"];
    p.localIdentifier = [self.configuration objectForKey:@"localId"];
    p.remoteIdentifier = [self.configuration objectForKey:@"remoteId"];
    p.disconnectOnSleep = NO;
    p.enableRevocationCheck = NO;
    p.enablePFS = NO;
    p.disableMOBIKE = NO;
    p.useExtendedAuthentication = YES;

    p.IKESecurityAssociationParameters.encryptionAlgorithm = NEVPNIKEv2EncryptionAlgorithmAES256;
    p.IKESecurityAssociationParameters.integrityAlgorithm = NEVPNIKEv2IntegrityAlgorithmSHA256;
    p.IKESecurityAssociationParameters.diffieHellmanGroup = NEVPNIKEv2DiffieHellmanGroup14;
    p.IKESecurityAssociationParameters.lifetimeMinutes = 1440;

    p.childSecurityAssociationParameters.encryptionAlgorithm = NEVPNIKEv2EncryptionAlgorithmAES256;
    p.childSecurityAssociationParameters.integrityAlgorithm = NEVPNIKEv2IntegrityAlgorithmSHA256;
    p.childSecurityAssociationParameters.diffieHellmanGroup = NEVPNIKEv2DiffieHellmanGroup14;
    p.childSecurityAssociationParameters.lifetimeMinutes = 1440;

    return p;
}

- (void) installProfile:(NSString*)username password:(NSString*)password {
    [vpnManager loadFromPreferencesWithCompletionHandler:^(NSError *error) {
        if (error) {
            NSLog(@"Load config failed [%@]", error.localizedDescription);
            return;
        }

        [self setup:username password: password];
        [vpnManager saveToPreferencesWithCompletionHandler:^(NSError *error) {
            if (error) {
                NSLog(@"Save config failed [%@]", error.localizedDescription);
            }
        }];
    }];
}

- (void) setup:(NSString*)username password:(NSString*)password  {
    self.protocol.username = username;

    // NSData* passwordData = [password dataUsingEncoding:NSUTF8StringEncoding];
    // p.passwordReference = passwordData;

    vpnManager.protocolConfiguration = self.protocol;
    vpnManager.localizedDescription = [self.configuration objectForKey:@"description"];
    vpnManager.enabled = YES;
}

@end
