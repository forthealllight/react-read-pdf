import * as React from "react";
import { Component,Fragment } from 'react';
import * as CSSModules from "react-css-modules";
import * as styles from './index.less';
import * as pdfjsLib from 'pdfjs-dist';
const pdfjsViewer = require('../../../node_modules/pdfjs-dist/web/pdf_viewer.js');
// The workerSrc property shall be specified.
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.0.550/pdf.worker.js';

interface IProps {

}
interface IStates {

}
class MobilePDFReader extends Component<IProps,IStates> {
  state = {

  }
  public render(){
    return <div>
              <div id="viewerContainer" ref={this.container}>
                <div id="viewer" className="pdfViewer" ></div>
              </div>
              <div id="loadingBar">
                <div className="progress"></div>
                <div className="glimmer"></div>
              </div>
              <div id="errorWrapper" hidden={true}>
                <div id="errorMessageLeft">
                  <span id="errorMessage"></span>
                  <button id="errorShowMore">
                     More Information
                  </button>
                  <button id="errorShowLess">
                     Less Information
                  </button>
                </div>
                <div id="errorMessageRight">
                  <button id="errorClose">
                     Close
                  </button>
                </div>
                <div className="clearBoth"></div>
                <textarea id="errorMoreInfo" hidden={true} readOnly="readonly"></textarea>
              </div>
              <footer>
                <button className="toolbarButton pageUp" title="Previous Page" id="previous"></button>
                <button className="toolbarButton pageDown" title="Next Page" id="next"></button>
                <input type="number" id="pageNumber" className="toolbarField pageNumber"size="4" min="1"/>
                <button className="toolbarButton zoomOut" title="Zoom Out" id="zoomOut"></button>
                <button className="toolbarButton zoomIn" title="Zoom In" id="zoomIn"></button>
              </footer>
          </div>
  }
}
export default  CSSModules(MobilePDFReader,styles);
