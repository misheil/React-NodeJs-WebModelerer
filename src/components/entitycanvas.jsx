import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { observable, action  } from 'mobx';

const entityBaseStyle = {
	position: 'absolute',
	width: 100,
	border: '1px solid cornflowerblue',
	borderRadius: 4,        
	padding: 20
};

export const EntityCanvas = observer(({entityStore,fromChield}) => (
	<div key="canvas" style={{width:'100%' }}>
	{
		entityStore.entities.map(entity =>
			<Entity entity={entity} entityStore={entityStore} fromChield={fromChield} />
			)}
		</div>
		)
);

const Entity = observer(({entity , entityStore,fromChield}) => (

	<div key="a{entity.id}"  onDragStart = {(e) => entityStore.onDragStart(e, entity.id,entity.x, entity.y)}
	onDragOver={(e)=>entityStore.onDragOver(e)}
	onDrop={(e)=>{entityStore.onDrop(e, entity ,fromChield )}} 
	style={{width:'100%',height:'100%',marginLeft:'0px',marginTop:'0px'}}>

	<div key="b{entity.id}" 
                    draggable
			style={Object.assign({}, entityBaseStyle, {
		  		left: entity.x,
		  		top: entity.y,
		  		background:entity.BGcolor,
		  		borderRadius: '5px',
		  		textAlign:'center',
		  		color : '#FFF',
		  		width: '120px'
			})}
	>

	{(entityStore.txtVal[entity.id] =="undefined" || entityStore.txtVal[entity.id] == null ) ? entityStore.handleFill(entity.id,entity.name) : entityStore.handleFill(entity.id,entityStore.txtVal[entity.id])}
	{entityStore.flag === 0 ? ( 
	<div key={entity.id} id={entity.name} onDoubleClick={entityStore.handleEditing}>
	{entityStore.txtVal[entity.id]}
    </div>
    ) : (
     <div key={entity.id} onDoubleClick={entityStore.handleEditing}>
     <input type="text" ref="txt" value={entityStore.txtVal[entity.id]} className="form-control" onKeyDown={(e) => entityStore.handleEditingDone(e, entity.id)} onKeyUp={(e) => entityStore.handleKeyUp(e, entity.id)}   />
     </div>             
     )}

    </div>
	</div>

	))


