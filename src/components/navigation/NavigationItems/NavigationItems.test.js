import React from 'react'
import { configure, shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';

import NavigationItem from './NavigationItem'
import NavigationItems from './NavigationItems'
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';
import { auth, authSuccess } from '../../../store/actions/auth'
import { AUTH_SUCCESS } from '../../../store/actions/types';

import thunk from 'redux-thunk'


configure({
    adapter: new Adapter()
})

describe('<NavigationItems />', () => {
    const mockStore = configureStore([thunk])
    const initialState = {
        auth: {
            token: null
        }
    }
    let store
    let component

    beforeEach(() => {
        store = mockStore(() => initialState)

        component = mount(
            <Provider store={store}>
                <BrowserRouter>
                    <NavigationItems />
                </BrowserRouter>
            </Provider>
        )      
    })

    it('should render two <NavigationItem /> elements if not authenticated', () => {
        expect(component.find(NavigationItem)).toHaveLength(2)
    })
    
    it('should render three <NavigationItem /> elements if authenticated', () => {
        const initialState = {
            auth: {
                token: null
            }
        }
        const store = mockStore(() => initialState)        
        expect(component.find(NavigationItem)).toHaveLength(3)
    })
})