import 'reflect-metadata';

import { Result } from '../../src/core/logic/Result';
import { Path } from '../../src/domain/path';
import { expect } from 'chai';
import { it } from 'mocha';

describe('Tests Path class for its rules', () => {
  it('cannot create without starting warehouse', () => {
    const expected = Result.fail<Path>('Must provide a path name');

    const props = {
      id: '545454545453',
      name: '',
      nameWarehouseStart: 'M01',
      nameWarehouseDestiny: 'M02',
      distance: '50',
      timePath: '10',
      energySpent: '10',
      extraTimePath: '2',
    };

    const obtained = Path.create(props);
    expect(obtained.error).to.equal(expected.error);
    expect(obtained.isFailure).to.equal(true);
  });

  it('gets', () => {
    var id: string = '545454545453';
    var name: string = '1';
    var nameWarehouseStart: string = 'M01';
    var nameWarehouseDestiny: string = 'M02';
    var distance: string = '50';
    var timePath: string = '10';
    var energySpent: string = '10';
    var extraTimePath: string = '2';

    const props = {
      id: '545454545453',
      name: '1',
      nameWarehouseStart: 'M01',
      nameWarehouseDestiny: 'M02',
      distance: '50',
      timePath: '10',
      energySpent: '10',
      extraTimePath: '2',
    };

    const obtained = Path.create(props);

    expect(obtained.getValue().name).to.equal(name);
    expect(obtained.getValue().nameWarehouseStart).to.equal(nameWarehouseStart);
    expect(obtained.getValue().nameWarehouseDestiny).to.equal(nameWarehouseDestiny);
    expect(obtained.getValue().distance).to.equal(distance);
    expect(obtained.getValue().timePath).to.equal(timePath);
    expect(obtained.getValue().energySpent).to.equal(energySpent);
    expect(obtained.getValue().extraTimePath).to.equal(extraTimePath);
  });

  it('Result Ok', () => {
    const expected = Result.ok<Path>();

    const props = {
      id: '545454545453',
      name: '1',
      nameWarehouseStart: 'M01',
      nameWarehouseDestiny: 'M02',
      distance: '50',
      timePath: '10',
      energySpent: '10',
      extraTimePath: '2',
    };

    const obtained = Path.create(props);
    expect(obtained.getValue).to.equal(expected.getValue);
    expect(obtained.isSuccess).to.equal(true);
  });
});
