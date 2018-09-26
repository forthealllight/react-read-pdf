import * as React from "react";
import * as CSSModules from "react-css-modules";
import * as styles from './index.less';
export interface IProps {

}
export default class PDF extends React.Component<IProps, undefined> {
    render() {
        return (
            <div className={styles['pdf']}>
                <h1>Hello World!</h1>
                <p>Foo to the barz</p>
            </div>
        );
    }
}
