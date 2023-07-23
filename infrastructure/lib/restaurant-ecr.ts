#!/usr/bin/env node
import { RemovalPolicy, Stack } from 'aws-cdk-lib';
import { IRepository, Repository } from 'aws-cdk-lib/aws-ecr';
import { Construct } from 'constructs';

export interface EcrProps {
  repositoryName: string;
}

export class RestaurantEcr extends Construct {
  public readonly repository: IRepository;
  constructor(parent: Stack, name: string, props: EcrProps) {
    super(parent, name);

    this.repository = new Repository(this, props.repositoryName, {
      imageScanOnPush: false,
      removalPolicy: RemovalPolicy.DESTROY,
    });
  }
}
