import * as React from "react";
import * as CSSModules from "react-css-modules";
import * as styles from './index.less';
import * as pdfjsLib from 'pdfjs-dist';
// The workerSrc property shall be specified.
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.0.550/pdf.worker.js';

export interface IProps {
  url:string
}
export interface IStates {
  pdf:any
}
export default class PDF extends React.Component<IProps, IStates> {
    state = {
      pdf:null,
      page:1
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
    renderPage(){
      const { pdf } = this.state;
      pdf.getPage(this.state.page).then((page) => {
        const scale = 1.5;
        const viewport = page.getViewport(scale);
        const canvas = this.canvas.current;
        const canvasContext = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        const renderContext = {
          canvasContext,
          viewport,
        };
        page.render(renderContext);
    }
    public render():JSX.Element {
        return (
            <canvas ref={this.canvas}/>
        );
    }
}
