import React, { useRef, useState } from "react";
import "./Cart.css";
import List from "./../List/List";

const Cart = () => {
  const [items, setItems] = useState([]);
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [messageColor, setMessageColor] = useState("");
  const [editable, setEditable] = useState(false);
  const [index, setIndex] = useState();
  const timer = useRef();
  const inputRef = useRef(null);
  const onChangeHandler = (e) => {
    setInput(e.target.value);
  };
  const errorHandler = (message, color) => {
    setMessageColor(color);
    setError(message);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setError("");
      clearTimeout(timer.current);
    }, 3000);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (editable) {
      setEditable(false);

      items[index] = input;
      setInput("");
    } else if (input === "") {
      errorHandler("plrase enter value", "messageColorRed");
    } else {
      let array = items;
      array.push(input);
      setItems(array);
      setInput("");
      errorHandler("item added to the List", "messageColorGreen");
    }
  };
  const deleteHandler = (deletedItem) => {
    let updateAftereDelete = items.filter((e) => {
      return deletedItem !== e;
    });
    setItems(updateAftereDelete);
  };

  const editHandler = (editedItem) => {
    setEditable(true);
    let editedItemIndex = items.findIndex((e) => e === editedItem);
    setIndex(editedItemIndex);
    inputRef.current.focus();
    setInput(editedItem);
  };
  return (
    <div className=" cart bg-white w-50 vh-25 d-flex flex-column justify-content-center  p-4 border border-1 text-center ">
      {error && <p className={messageColor}>{error}</p>}
      <h2>Grocery Bud</h2>
      <form onSubmit={submitHandler} className="d-flex ">
        <input
          ref={inputRef}
          value={input}
          onChange={onChangeHandler}
          className="col mt-3 cartBtn"
          placeholder="e.g. eggs"
          type="text"
        />
        <button className="mt-3 cartBtn">submit</button>
      </form>
      {items.length > 0 && (
        <List
          setItems={setItems}
          items={items}
          deleteHandler={deleteHandler}
          editHandler={editHandler}
        />
      )}
    </div>
  );
};

export default Cart;
