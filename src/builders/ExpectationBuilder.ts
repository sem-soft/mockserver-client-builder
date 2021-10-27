import { Times, TimeToLive } from '../types';
import Expectation from '../dto/Expectation';
import ActionBuilderInterface from './actions/ActionBuilderInterface';
import RequestMatcherBuilder from './RequestMatcherBuilder';

/**
 * Expectation builder class
 * @see {@link https://www.mock-server.com/mock_server/creating_expectations.html}
 * @class
 */
export default class ExpectationBuilder {
  /**
     * @type {Expectation} expectation - the expectation for building
     * @private
     */
  private expectation: Expectation;

  /**
     * @constructor
     */
  constructor() {
    this.expectation = new Expectation();
  }

  /**
     * The client request for reactions
     * @param {RequestMatcherBuilder} requestMatcherBuilder
     * @return ExpectationBuilder
     */
  public when(requestMatcherBuilder: RequestMatcherBuilder): ExpectationBuilder {
    this.expectation.httpRequest = requestMatcherBuilder.getMatcher();
    return this;
  }

  /**
     * Reaction on request
     * @param {ActionBuilderInterface} action
     * @return ExpectationBuilder
     */
  public action(action: ActionBuilderInterface): ExpectationBuilder {
    this.expectation = {
      ...this.expectation,
      ...action.getAction(),
    };
    return this;
  }

  /** *
     * Sets the priority of matching order — highest first.
     * Default matching is ordered by creation — earliest first.
     * @param {number} value
     * @return ExpectationBuilder
     */
  public withPriority(value: number): ExpectationBuilder {
    this.expectation.priority = value;
    return this;
  }

  /**
     * Sets how many times the action should be taken.
     * The expectation will remove automatically triggered several times. Unlimited times by default.
     * @param {Times} value
     * @return ExpectationBuilder
     */
  public withTimes(value: Times): ExpectationBuilder {
    this.expectation.times = value;
    return this;
  }

  /**
     * Sets the time of expectation activity.
     * Unlimited by defaults.
     * @param {TimeToLive} value
     * @return ExpectationBuilder
     */
  public withTimeToLive(value: TimeToLive): ExpectationBuilder {
    this.expectation.timeToLive = value;
    return this;
  }

  /**
     * Sets the unique id for expectation.
     * If expectation with current id exists, it will be replaced by another one.
     * @param {string} id
     * @return ExpectationBuilder
     */
  public withId(id: string): ExpectationBuilder {
    this.expectation.id = id;
    return this;
  }

  /**
     * @return {Expectation} - Returns compiled expectation
     */
  public getExpectation(): Expectation {
    return this.expectation;
  }
}
