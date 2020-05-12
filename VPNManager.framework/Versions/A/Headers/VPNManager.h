#import <Foundation/Foundation.h>
#import <NetworkExtension/NetworkExtension.h>

@class VPNManagerProtocol;

@interface VPNManagerProtocol : NSObject

@property (nonatomic, class, readonly) NSString *IKEV2;

@end

@class VPNManagerError;

@interface VPNManagerError : NSObject

@property (nonatomic, class, readonly) int Load;

@property (nonatomic, class, readonly) int Save;

@property (nonatomic, class, readonly) int Start;

@end

@class VPNManager;

@interface VPNManager : NSObject

@property NEVPNProtocol *protocol;

- (id) initWithConfiguration:(NSDictionary *)configuration;

- (id) initWithJson:(NSString *) jsonString;

- (void) connect:(NSString*)userName password:(NSString*)password complete: (void(^)(bool))handler;

- (bool) disconnect;

@end
