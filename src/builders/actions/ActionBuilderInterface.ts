/**
 * Action contract for builders with getAction method
 */
import { ActionType } from '../../types';

export default interface ActionBuilderInterface {

  /**
     * @return {ActionType} current action type
     */
  getAction(): ActionType;
}
