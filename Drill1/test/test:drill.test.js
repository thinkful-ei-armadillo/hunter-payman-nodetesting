'use strict';

const expect = require('chai').expect;
const sort = require('../Drill.js');

describe('sort function', () => {
  it('should sort array in ascending order', () => {
    let list = [2, 9, 10, 4, 7];
    let newList = sort(list);
    const expectedAnswer = 4;
    const actualAnswer = newList[1];
    expect(actualAnswer).to.equal(expectedAnswer);
  });

  it('should contain numbers in array', () => {
    let list = [2, 9, 10, 4, 7];
    let newList = sort(list);
    expect(newList[1]).to.be.a('number');
  });

  it('should be an array', () => {
    let list = [2, 9, 10, 4, 7];
    let newList = sort(list);
    expect(newList).to.be.an('array');
  });

  it('should work on an empty array', () => {
    let list = [];
    let newList = sort(list);
    expect(newList).to.deep.equal([]);
  });

  it('test on non array', () => {
    let list = { hi: 'jooce', sup: 'bark' };
    let newList = sort(list);
    expect(newList).to.not.be.an('array');
  });

  it('should sort numbers in array', () => {
    let list = [2, 9, 10, 4, 7];
    let list2 = [9, 10, 4, 7, 2];
    let newList1 = sort(list);
    let newList2 = sort(list2);
    expect(newList1).to.deep.equal(newList2);
  });

  it('should sort letters in array in ascending order', () => {
    let list = ['d', 'x', 'r', 'n', 'p'];
    let newList = sort(list);
    const expectedAnswer = 'n';
    const actualAnswer = newList[1];
    expect(actualAnswer).to.equal(expectedAnswer);
  });

  it('includes accounting for a negative number', () => {
    let list = [-3, 5, -1, 9, 10];
    let newList = sort(list);
    const expectedAnswer = -1;
    const actualAnswer = newList[1];
    expect(actualAnswer).to.equal(expectedAnswer);
  });

  /*it('sorts both numbers and letters together', () => {
    let list = [-3, 'a', 5, 'e', -1, 9, 'i', 'o', 'u'];
    let list2 = [-3, 5, -1, 9, 'a', 'i', 'e', 'o', 'u'];
    let newList1 = sort(list);
    let newList2 = sort(list2);
    expect(newList1).to.deep.equal(newList2);
  });*/
});
