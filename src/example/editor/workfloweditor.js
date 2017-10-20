/*global mxEvent mxGraph mxGraphHandler mxGuide mxEdgeHandler mxResources mxConstants */
import React, { Component } from 'react'

import createEditor from './createEditor'

const load = ()=>{
	mxGraph.prototype.htmlLabels = true;
	
	mxGraph.prototype.isWrapping = function(cell) { return true; };
	
	mxConstants.DEFAULT_HOTSPOT = 1;
	
	// Enables guides
	mxGraphHandler.prototype.guidesEnabled = true;
	
	// Alt disables guides
	mxGuide.prototype.isEnabledForEvent = function(evt) { return !mxEvent.isAltDown(evt); };
	
	// Enables snapping waypoints to terminals
	mxEdgeHandler.prototype.snapToTerminals = true;
	
	window.onbeforeunload = function() { return mxResources.get('changesLost'); };

	setTimeout(() => createEditor('mxgraph/config/tojson/workfloweditor.xml'));
}

class Workfloweditor extends Component {
	state = {
		oneTime: true 
	}

	componentDidMount() {
		load()
	}
	
	render() {
		return (
			<div className="graph-wrp">
				<table id="splash" width="100%" height="100%"
					style={{
						background: 'white',
						position: 'absolute',
						top: '0px',
						left: '0px',
						zIndex: '4'
					}}
				>
					<tbody>
						<tr>
							<td align="center" valign="middle">
								<img src="images/loading.gif" />
							</td>
						</tr>
					</tbody>
				</table>
				<div id="graph" className="base"></div>
				<div id="status" className="base" align="right" style={{whiteSpace: 'nowrap'}}></div>
			</div>
		)
	}
}

export default Workfloweditor