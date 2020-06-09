import React from 'react';
import { Route, Redirect } from 'react-router-dom';
function AuthRoute(props) {
    // props looks like: 
    // {
    //   isAllowed: null | { first_name: 'jon', last_name: 'snow' ... },
    //   render: null | () => {} | function() {},
    //   component: null | <Component />,
    //   hello: 'world',
    //   anythingElse: 1
    // }
    const {
        isAllowed = false, // default to the value of false if `isAllowed` is a falsey value
        render, // is a function that will return a reactComponent
        component: Component,  // a react component
        helloWorld,
        ...restProps
    } = props;
    console.log('authroute', props);
    return (
        <Route
            {...restProps}
            render={(routeProps) => {

                console.log('authroute2', isAllowed)
                if (isAllowed) {
                    // this if statement covers the 2 different ways we use <Route/>
                    // in both ways we need to pass in `routeProps` so that the child component can use it.
                    if (typeof render === 'function') {
                        return render(routeProps);
                    } else {
                        return <Component {...routeProps} />
                    }
                } else {
                    // if `isAllowed` is falsey then we will force a redirect by rendering out the <Redirect/> Component.
                    return <Redirect to='/sign_in' />
                }
            }}
        />
    )
}
export default AuthRoute