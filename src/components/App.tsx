import * as React from "react";
import * as CSSModules from "react-css-modules";
import * as styles from './App.less';
export interface AppProps {

}
export default class App extends React.Component<AppProps, undefined> {
    render() {
        return (
            <div className={styles['App']}>
                <h1>Hello World!</h1>
                <p>Foo to the barz</p>
            </div>
        );
    }
}
