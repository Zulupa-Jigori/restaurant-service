import { Stack } from 'aws-cdk-lib';
import { IVpc, SubnetType, Vpc } from 'aws-cdk-lib/aws-ec2';
import { Construct } from 'constructs';

export class RestaurantVpc extends Construct {
  public readonly vpc: IVpc;
  constructor(parent: Stack, name: string) {
    super(parent, name);
    this.vpc = new Vpc(this, 'restaurant-service-vpc', {
      cidr: '10.100.0.0/16',
      maxAzs: 2,
      subnetConfiguration: [
        {
          name: 'public-1',
          cidrMask: 24,
          subnetType: SubnetType.PUBLIC,
        },
        {
          name: 'private-1',
          cidrMask: 24,
          subnetType: SubnetType.PRIVATE_WITH_NAT,
        },
      ],
    });
  }
}
