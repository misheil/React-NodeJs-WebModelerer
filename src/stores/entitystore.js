import {observable, action, computed, autorunAsync} from "mobx";
import axios from 'axios';


const hasLocalStorage = typeof window !== "undefined" && window.localStorage;


export class Entity {

  constructor(json) {
    if (json) {
      Object.assign(this, json);
    }
  }

  @computed get asJson() {
    const {id, name, x, y } = this;
    return { id, name, x, y };
  }
}

export class EntityStore {
  @observable editing = false;
  @observable flag = 0;
  @observable txtVal = {};
  @observable entities = [];
  
  constructor() {
    autorunAsync(
      this.saveToLocalStorageReaction,
      200
    );
    


  }

  @action loadJson(json) {  
    this.entities = json.map(entityData =>
      new Entity(entityData)
      );
  }

  @action loadJsonNew() {
    axios.post('http://localhost:4200/serverport/getDragedCoords')
      .then(response => {
        this.entities = response.data.map(entityData =>
      new Entity(entityData));
      })
      .catch(function (error) {
        console.log(error)
      });
    }

  @action addEntity(name, x, y) {
    this.entities.push(new Entity({
      name, x, y
    }));
  }
  

  saveToLocalStorageReaction = () => {
    if (hasLocalStorage) {
      window.localStorage.setItem("domain-model-app", JSON.stringify(this.asJson));
    }
  }

  @action loadFromLocalStorage() {
    const data = hasLocalStorage && window.localStorage.getItem("domain-model-app");
    if (data) {
      this.loadJson(JSON.parse(data));
    } else {
      this.loadJson([]);
    }
  }

  @computed get asJson() {
    return this.entities.map(e => e.asJson);
  }



  @action onDragStart = (ev, id,x,y) => {
        ev.dataTransfer.setData("id", id);
        ev.dataTransfer.setData("x", x);
        ev.dataTransfer.setData("y", y);
    }

    @action onDragOver = (ev) => {
        ev.preventDefault();
      }


  
  @action handleFill = (id,val) => {
   this.txtVal[id]=val;
 }

 @action handleEditing = (e) => {
  this.editing = ! this.editing
  if (this.editing) {
  this.flag=1
  }
  else{
  this.flag=0
  }
}


@action handleKeyUp = (e,idVal) => {
  if(e.keyCode === 8){
    this.txtVal[idVal]=this.txtVal[idVal].substring (0,this.txtVal[idVal].length-1);
    e.target.value=this.txtVal[idVal]
  }
  if((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 65 && e.keyCode <= 90)){
    this.txtVal[idVal]=this.txtVal[idVal]+e.key;
    e.target.value=this.txtVal[idVal]
  }

  var itId={"id": idVal,"name":this.txtVal[idVal]}
    axios.post('http://localhost:4200/serverport/updateEntityName',itId)
      .then(response => {
        return fromChield(response.data)
      })
      .catch(function (error) {
        console.log(error)
      });
 }

 @action handleEditingDone = (e,idVal) => {
  this.txtVal[idVal]=e.target.value;
  if(e.keyCode === 13){
  this.editing = ! this.editing
  if (this.editing) {
  this.flag=1
  }
else{
  this.flag=0
  }
}
}

 @action onDrop = (ev, entity,fromChield) => {
  let id = ev.dataTransfer.getData("id");
  entity.x=ev.screenX;
  entity.y=ev.screenY;
  var itId={"id": id,"x":ev.screenX,"y":ev.screenY}
  axios.post('http://localhost:4200/serverport/updateDragedCoords',itId)
      .then(response => {
        return fromChield(response.data)
      })
      .catch(function (error) {
        console.log(error)
      });
    }
  }
