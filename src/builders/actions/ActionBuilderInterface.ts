import { ActionType } from '../../types';

/**
 * Action contract for builders with getAction method
 */
export default interface ActionBuilderInterface {
  /**
   * Returns builded action for expectation usage
   */
  getAction(): ActionType;
}
