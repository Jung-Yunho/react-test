import React from 'react'
import NameForm from './NameForm'

/*
import renderer from 'react-test-renderer'
describe('NameForm', () => {
    let component = null

    it('renders correctly', () => {
        component = renderer.create(<NameForm/>)
    })

    it('matches snapshot', () => {
        const tree = component.toJSON()
        expect(tree).toMatchSnapshot()
    })
})*/



import {shallow} from 'enzyme'
describe('NameForm', () => {
    let component = null

    // 테스트용 onInsert 함수. changed 값을 바꿔줌
    let changed = null
    const onInsert = (name) => {
        changed = name
    }

    it('renders correctly', () => {
        component = shallow(<NameForm onInsert={onInsert}/>)
    })

    it('matches snapshot', () => {
        expect(component).toMatchSnapshot()
    })

    describe('insert new text', ()=>{
        it('has a form', () =>{
            expect(component.find('form').exists()).toBe(true)
        })
        it('has an input', () =>{
            expect(component.find('input').exists()).toBe(true)
        })
        it('simulates input change', () => {
            const mockedEvent = {
                target : {
                    value: 'hello'
                }
            }
            //Do Event Simulates, Second Param is Event Obj
            component.find('input').simulate('change', mockedEvent)
            expect(component.state().name).toBe('hello')
        })
        it('simulates from submit', () => {
            const mockedEvent = {
                preventDefault: () => null // onSubmit 에서 preventDefault 를 호출하게 되므로 가짜 함수 추가
            }
            component.find('form').simulate('submit', mockedEvent)
            expect(component.state().name).toBe('') // 등록 하면 값이 공백으로 변한다
            expect(changed).toBe('hello')
        })
    })
})