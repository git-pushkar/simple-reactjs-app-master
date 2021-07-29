import React, {Component} from 'react';
import Panel from 'react-bootstrap/lib/Panel'
import axios from 'axios'

//This Component is a child Component of Regions Component
export default class RegionsDetails extends Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  //Function which is called when the component loads for the first time
  componentDidMount() {
    this.getRegionDetails(this.props.val)
  }

  //Function which is called whenver the component is updated
  componentDidUpdate(prevProps) {

    //get Region Details only if props has changed
    if (this.props.val !== prevProps.val) {
      this.getRegionDetails(this.props.val)
    }
  }

  //Function to Load the Regiondetails data from json.
  getRegionDetails(id) {
    axios.get('assets/samplejson/region' + id + '.json').then(response => {
      this.setState({regionDetails: response})
    })
  };

  render() {
    if (!this.state.regionDetails)
      return (<p>Loading Data...</p>)
    return (<div className="regionDetails">
      <Panel bsStyle="info" className="centeralign">
        <Panel.Heading>
          <Panel.Title componentClass="h3">{this.state.regionDetails.data.name}</Panel.Title>
        </Panel.Heading>
        <Panel.Body>
          <p>Service Name : {this.state.regionDetails.data.name}</p>
          <p>AWS Region : {this.state.regionDetails.data.region}</p>
          <p>Region Code : {this.state.regionDetails.data.regioncode}</p>
          <p>Country : {this.state.regionDetails.data.country}</p>
          <p>Category : {this.state.regionDetails.data.category}</p>
          <p>Details : {this.state.regionDetails.data.details}</p>
          <p>Additional Info : {this.state.regionDetails.data.additionalInfo}</p>
        </Panel.Body>
      </Panel>
    </div>)
  }
}
