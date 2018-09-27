import * as React from "react";
import * as CSSModules from "react-css-modules";
import * as styles from './index.less';
import * as pdfjsLib from 'pdfjs-dist';
// The workerSrc property shall be specified.
pdfjsLib.GlobalWorkerOptions.workerSrc = '../node_modules/pdfjs-dist/build/pdf.worker.js';

export interface IProps {
  url:string
}
export interface IStates {
  pdf:any
}
export default class PDF extends React.Component<IProps, IStates> {
    state = {
      pdf:null
    }
    public constructor(props:IProps){
      super(props);
      this.canvas=React.createRef();
    }
    public componentDidMount () {
      pdfjsLib.getDocument({
        url:this.props.url
      }).then((pdf)=>{
        this.setState({ pdf });
      })
    }
    public render():JSX.Element {
        return (
            <canvas ref={this.canvas}/>
        );
    }
}
