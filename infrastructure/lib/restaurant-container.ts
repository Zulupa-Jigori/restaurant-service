#!/usr/bin/env node
import { Stack } from 'aws-cdk-lib';
import * as acm from 'aws-cdk-lib/aws-certificatemanager';
import { IVpc } from 'aws-cdk-lib/aws-ec2';
import { IRepository } from 'aws-cdk-lib/aws-ecr';
import { Cluster, EcrImage } from 'aws-cdk-lib/aws-ecs';
import { ApplicationLoadBalancedFargateService } from 'aws-cdk-lib/aws-ecs-patterns';
import * as route53 from 'aws-cdk-lib/aws-route53';
import { Construct } from 'constructs';

interface Props {
  vpc: IVpc;
  repository: IRepository;
  domainName: string;
}

export class RestaurantContainer extends Construct {
  public readonly repository: IRepository;
  constructor(parent: Stack, name: string, private readonly props: Props) {
    super(parent, name);

    const cluster = new Cluster(this, 'restaurant-service-cluster', {
      vpc: props.vpc,
      clusterName: 'restaurant-service-cluster',
      containerInsights: true,
    });

    const zone = route53.HostedZone.fromLookup(this, 'Zone', {
      domainName: props.domainName,
    });
    const certificate = new acm.Certificate(this, 'RestaurantCertificate', {
      domainName: props.domainName,
      validation: acm.CertificateValidation.fromDns(zone),
    });

    new ApplicationLoadBalancedFargateService(this, 'restaurant-service', {
      cluster,
      circuitBreaker: {
        rollback: true,
      },
      domainName: props.domainName,
      domainZone: zone,
      certificate: certificate,
      cpu: 256,
      memoryLimitMiB: 512,
      desiredCount: 1,
      taskImageOptions: {
        image: EcrImage.fromEcrRepository(props.repository),
        containerPort: 8080,
      },
    });
  }
}
