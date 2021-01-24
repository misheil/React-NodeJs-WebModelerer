import React, { Component } from 'react';
import { EntityCanvas } from './entitycanvas';
import axios from 'axios';
import {EntityStore} from './../stores/entitystore';
import { observable, action  } from 'mobx';
import { observer }  from 'mobx-react';
import { SketchPicker } from 'react-color';


@observer
export class App extends Component {
  @observable styleCont ='40%';
  @observable selectBG =true;
  @observable entityBG = '#60B6F4';
  @observable Data = [];
  @observable Display = 'Display';

  @action setVal = (tempVar) => {
    this.Data=tempVar;
  }

  @action setDisplay = (tempDisp) => {
    this.Display=tempDisp;
  }

  @action handleChangeComplete = (color) => {
    this.entityBG= color.hex ;
  };

    // Misheil Show and hide Entity attribute 
  @action handleClick = (e) => {
    this.selectBG=  ! this.selectBG ;
    (this.selectBG) ? (this.styleCont= '40%',
      this.entityBG = '#60B6F4')
 : this.styleCont= '90%';   
  };
  
  @action fromChield = (xVar) => {
    this.setVal(xVar)
  };


  componentDidMount () {
    // Misheil get the data from the server 
    axios.post('http://localhost:4200/serverport/getCoords')
      .then(response => {
        this.setVal(response.data)
      })
      .catch(function (error) {
        console.log(error)
      });
  }

  render() {
    const entityStore = new EntityStore();
    entityStore.loadJson(this.Data); 
    
    return (
      <div className="container_main">
      <div className="container_left">
        <div className="containerBG" style={{height:this.styleCont}}>
        <form >
        <h5  key="h4"><b>Domain Model Editor</b></h5>
        <input type="text" ref="txt" className="form-control"  placeholder="Enter new entity" />
        { this.selectBG  ? (
          <div>
   
           <h6><input type="checkbox" value="true" name="colorbg" onClick={this.handleClick}  /> Select BG
         </h6>
        </div>
        )
        :
        ( 
          <div>
        <SketchPicker
        color={ this.entityBG }
        onChangeComplete={ this.handleChangeComplete } />
           <h6><input type="checkbox" defaultChecked  value="true"  name="colorbg" onClick={this.handleClick}  /> Select BG
         </h6></div>
        )
        }
        <input type="button" className="btn btn-primary" onClick={this.onAddEntity} value="Add Entity" />
        </form>
        </div>
        </div>

        <div className="container_right">
       <EntityCanvas entityStore={entityStore}  fromChield={this.fromChield} />
        </div>
      </div>
    );
  }

  onAddEntity = (e) => {
    e.preventDefault();
    const entityName = this.refs.txt.value;
    this.refs.txt.value ='';
    if (entityName) {
    var newEntityObj={newEntity : entityName , BG : this.entityBG}
    // Misheil get the data from the server 
    axios.post('http://localhost:4200/serverport/saveNewItem',newEntityObj)
      .then(response => {
        this.setVal(response.data)
      })
      .catch(function (error) {
        console.log(error)
      });
      this.setDisplay(entityName)
    }
  }
};
