import React, {Component} from 'react';
import Panel from 'react-bootstrap/lib/Panel'
import Button from 'react-bootstrap/lib/Button'
import RegionDetails from './RegionDetails'
import axios from 'axios'

export default class Regions extends Component {

  constructor(props) {
    super(props)
    this.state = {
      selectedRegion: 1
    }
  }

  //function which is called the first time the component loads
  componentDidMount() {
    this.getRegionData();
  }

  //Function to get the Region Data from json
  getRegionData() {
    axios.get('assets/samplejson/regionlist.json').then(response => {
      this.setState({regionList: response})
    })
  };

  render() {
    if (!this.state.regionList)
      return (<p>Loading data</p>)
    return (<div className="addmargin">
      <div className="col-md-3">
        {

          this.state.regionList.data.map(region => <Panel bsStyle="info" key={region.name} className="centeralign">
            <Panel.Heading>
              <Panel.Title componentClass="h3">{region.name}</Panel.Title>
            </Panel.Heading>
            <Panel.Body>
              <p>{region.region}</p>
              <p>{region.regioncode}</p>
              <Button bsStyle="info" onClick={() => this.setState({selectedRegion: region.id})}>

                Click to View Details

              </Button>

            </Panel.Body>
          </Panel>)
        }
      </div>
      <div className="col-md-6">
        <RegionDetails val={this.state.selectedRegion}/>
      </div>
    </div>)
  }

}
