import React,{useState} from "react";
import PoemDetails from "./PoemDetails";

export default function ListPoems() {
  
    const [t,setTitle]=useState(false);
    const [a,setAuthor]=useState(false);
    const [b,setBoth]=useState(true);
    //the 20 poems
    const [theData,setData]=useState([]);
    //index of the poem that has been clicked
    const [index,setIndex]=useState(0);
    const [favList, setFavList] = useState([]);

    function fetchPoem(){
        document.getElementById("fetchPoemsButton").style.display="none";
        fetch("https://poetrydb.org/random/20")
        .then((response) => response.json())
        .then((data) => {

            setData(data);
            document.getElementById("titleAuthorSelect").style.display="block";
            document.getElementById("fav").style.display="block";
      })
    } 
    const [selectChoice,setSelectChoice] = useState([]);
    //change which data is showing depending on select choice
    function handleSelectChange(event) {
        setSelectChoice(event.target.value);

        if(event.target.value==="title"){
            setBoth(false);
            setAuthor(false);
            setTitle(true);

        }if(event.target.value==="author"){
            setBoth(false);
            setAuthor(true);
            setTitle(false);
        
        }if(event.target.value==="both"){
            setBoth(true);
            setAuthor(false);
            setTitle(false);
        }
      }
      
      const [shown, setShown] = useState(false);
  
      const handleClick = (index) => {
        //toggle state depending if poemdetails are showing or not
        setShown(current => !current);

        //update index to the one that has just been clicked
        setIndex(index);
    }
        //if poemdetails are showing, scroll down to the bottom of the page
      if(shown){
        const element = document.getElementById("poemDet");
        element.scrollIntoView(true);
    }
  
    //add title and author to fav list
      function addFav(e){
        setFavList(prev=>[...prev,e[0]+e[1]]);
      }
      //delete from fav list
      function delFav(e){
        setFavList(pre=> pre.filter(item => item !== e[0]+e[1]));
      }
   
    return (
        <div>
            <button id = "fetchPoemsButton"type="button" onClick={fetchPoem}>Fetch poems</button>
            <div id="titleAuthorSelect">
                <div id="info">
                    <p>You can choose whether to view both title and author in the list
                        to the left, or just the title, or just the author of the poem.
                        <br></br> 
                        <br></br>
                        By clicking on one of the poem in the list to the left you will automatically
                        be moved to the bottom of the page &#40; if you double click &#41;, where you can read the title, author, and the
                        poem itself. Here you can add or delete a poem from your favorites list.
                        <br></br> 
                        <br></br>
                        Your poems you have added to the favorites list will be shown to the right.
                        <br></br> 
                        </p>
                    </div>

                <select className="selectta"value={selectChoice} onChange={handleSelectChange}>
                    <option value="both">Choose title or author</option>
                    <option value="title">Title</option>
                    <option value="author">Author</option>
                </select>
            </div>

            <div id="poemList">
                {b && (
                    <ul id="ul1">
                        {theData.map((i,index)=>{
                        return(
                            <li key={index} onClick={() => {
                                    handleClick(index); 
                                }}>
                                <div>Title: {i.title}<br></br>Author: {i.author}</div>
                                <br></br>
                            </li>
                    )})}</ul>
                )}
                {t && (
                    <ul id="ul2">
                        {theData.map((i,index)=>{
                        return(
                            <li key={index} onClick={() => {
                                    handleClick(index); 
                                }}>
                                <div>Title: {i.title}</div>
                                <br></br> 
                            </li>
                    )})}</ul>)}
                {a && (
                    <ul id="ul3">
                        {theData.map((i,index)=>{
                        return(
                            <li key={index} onClick={() => {
                                    handleClick(index); 
                                }}>
                                <div>Author: {i.author}</div>
                                <br></br> 
                            </li>
                    )})}</ul>)}
       
                <div id="poemDet"className="poemDet">
                    {shown && <PoemDetails key={index} fL={favList} addFav={addFav} delFav={delFav} title={theData[index].title} author={theData[index].author} lines={theData[index].lines}/>}
                </div>
            </div>
    
            <div id="fav"className ="fav">
                <ul>
                    Your favorites:
                    
                        {favList.map((i,indexFav)=>{
                        return(
                            <li key={indexFav}>
                              <p>
                                {i}
                                <br></br>
                              </p>  
                            </li>
                    )})}</ul>
            </div>
        </div>
    );
}