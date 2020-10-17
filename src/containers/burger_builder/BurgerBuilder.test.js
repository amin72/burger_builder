import React from 'react'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import configureStore from 'redux-mock-store';

import { BurgerBuilder } from './BurgerBuilder'
import BuildControls from '../../components/burger/build_control/BuildControls'


configure({
    adapter: new Adapter()
})

const mockStore = configureStore([]);

describe('<BurgerBuilder />', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<BurgerBuilder fetchIngredients={() => {}} />)
    })

    it('should render <BuildControls /> when receiving ingredients', () => {
        wrapper.setProps({
            ingredients: {
                salad: 0
            }
        })
        expect(wrapper.find(BuildControls)).toHaveLength(1)
    })
})