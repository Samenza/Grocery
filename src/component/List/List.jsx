import React from "react";
import { MdDelete } from "react-icons/md";
import { BiEditAlt } from "react-icons/bi";
const List = ({ items, setItems, deleteHandler, editHandler }) => {
  return (
    <div className="d-flex flex-column justify-content-between align-items-between listItems ">
      {items.map((item) => {
        return (
          <div
            key={item + Math.floor(Math.random() * 10)}
            className=" d-flex justify-content-between  px-4"
          >
            <p className="text-info">{item}</p>
            <div className="cursor">
              <BiEditAlt
                onClick={() => {
                  editHandler(item);
                }}
                className="m-1 text-primary "
              />
              <MdDelete
                onClick={() => {
                  deleteHandler(item);
                }}
                className="m-1 text-danger"
              />
            </div>
          </div>
        );
      })}
      <div className="d-flex justify-content-center">
        <p onClick={() => setItems([])} className="text-danger clearList  ">
          clear List
        </p>
      </div>
    </div>
  );
};

export default List;
