import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { RestaurantContainer } from './restaurant-container';
import { RestaurantEcr } from './restaurant-ecr';
import { RestaurantVpc } from './restaurant-vpc';

export class InfrastructureStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const ecr = new RestaurantEcr(this, RestaurantEcr.name, {
      repositoryName: 'restaurant-service-repository',
    });
    const vpc = new RestaurantVpc(this, RestaurantVpc.name);
    const container = new RestaurantContainer(this, RestaurantContainer.name, {
      vpc: vpc.vpc,
      repository: ecr.repository,
      domainName: 'zalupa-jigori.click',
    });
  }
}
