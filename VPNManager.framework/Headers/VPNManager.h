#import <Foundation/Foundation.h>
#import <NetworkExtension/NetworkExtension.h>

@class VPNManagerProtocol;

@interface VPNManagerProtocol : NSObject

@property (nonatomic, class, readonly) NSString *IKEV2;

@end

@class VPNManager;

@interface VPNManager : NSObject

@property NEVPNProtocol *protocol;

- (id) initWithConfiguration:(NSDictionary *)configuration;

- (id) initWithJson:(NSString *) jsonString;

- (void) connect:(NSString*)userName password:(NSString*)password;

- (bool) disconnect;

@end
