import React from "react";

export default function PoemDetails(props) {

    const currentlyAFav = <p>Delete from favorites</p>              
    const notCurrentlyAFav = <p>Add to favorites</p>
 
    //add title and author to fav list
   function handleClickFav(){
        props.addFav([props.title,props.author]);
   }
    //delete from fav list
   function handleClickDel(){
        props.delFav([props.title,props.author]);
   }

   //return true if the poem you have clicked is already added into the
   //favorites list, else return false
   function ifAlreadyInFav(props1){
        if(props1.fL.length>0){
            for (let i = 0; i < props1.fL.length; i++) {
                if(props1.fL[i] === props1.title+props1.author){
                    return true
                }
            }
            return false
        }
    }

   return (
    <div>
        <div>Title: {props.title}
            <button id = "favButton"type="button" onClick={() =>
                ifAlreadyInFav(props) ? handleClickDel() : handleClickFav()}>
                    {ifAlreadyInFav(props) ? currentlyAFav : notCurrentlyAFav}
            </button>
        </div>
        <div>Author: {props.author}</div>
        <br></br>
        <div>{props.lines}</div>
    </div>
    );
}