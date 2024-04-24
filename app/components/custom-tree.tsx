"use client";
import React, { useState } from "react";
import { ChevronRightIcon, ChevronDownIcon } from "@heroicons/react/24/solid";
import { Checkbox, listItemAvatarClasses } from "@mui/material";
import { updateSubtaskList } from "../lib/actions/(dashboard)/todo/action";

export type childItemType = {
  id: string;
  label: string;
  isChecked: boolean;
  isStriked: boolean;
};

export type itemType = {
  id: string;
  label: string;
  doneTasks: number;
  children?: Array<Object>;
  isCollapsed: boolean;
};

export function TreeChildView(items: any) {
  const [itemsData, setItemsData] = useState(
    items.items.map((item: any) => ({
      ...item,
      isChecked: false,
      isStriked: false,
    })) // Add isChecked property to each item with default false
  );
  const handleClick = async (itemId: string, isChecked: boolean) => {
    const status = isChecked ? "pending" : "done";
    await updateSubtaskList(
      "3d0d8849-6bfb-4ba1-92d7-bde3506605ec",
      itemId,
      status
    );
    console.log(itemId);
    setItemsData((prevItems: any[]) =>
      prevItems.map((item: childItemType) =>
        item.id === itemId
          ? { ...item, isChecked: !item.isChecked, isStriked: !item.isStriked }
          : item
      )
    ); // Update isChecked for clicked item only
  };

  return (
    <div className='w-full px-6'>
      {itemsData.length > 0 && (
        <ul>
          {itemsData.map(
            ({ id, label, isChecked, isStriked }: childItemType) => (
              <li key={id} onClick={() => handleClick(id, isChecked)}>
                <li className='list-none p-0 outline-0 m-0'>
                  <div className='flex flex-col cursor-pointer items-center'>
                    <div className='flex flex-row items-center gap-5 h-10 font-bold w-full'>
                      <div className='w-6'>
                        <Checkbox
                          checked={isChecked}
                          onChange={() => handleClick(id, isChecked)}
                        />
                      </div>
                      <h2
                        className={`h-7 font-bold ${
                          isStriked ? "line-through text-gray-400" : ""
                        }`}
                      >
                        {label}
                      </h2>
                    </div>
                  </div>
                </li>
              </li>
            )
          )}
        </ul>
      )}
    </div>
  );
}

export default function CustomTreeView(items: any) {
  const [itemsData, setItemsData] = useState(
    items.items.map((item: any) => ({
      ...item,
      isCollapsed: false,
    })) // Add isChecked property to each item with default false
  );

  const handleClick = (itemId: string) => {
    setItemsData((prevItems: any[]) =>
      prevItems.map((item: itemType) =>
        item.id === itemId ? { ...item, isCollapsed: !item.isCollapsed } : item
      )
    ); // Update isChecked for clicked item only
  };

  return (
    <div>
      {itemsData.length > 0 &&
        itemsData.map(({ id, label, children, isCollapsed }: itemType) => (
          <ul key={id}>
            <li className='list-none p-0 outline-0 m-0'>
              <div className='flex flex-col cursor-pointer items-center'>
                <div
                  className='flex flex-row items-center h-10 font-bold w-full hover:bg-gray-200 selection:bg-blue-300'
                  onClick={() => handleClick(id)}
                >
                  <div className='w-6'>
                    {isCollapsed ? (
                      <ChevronDownIcon className='h-4 font-medium' />
                    ) : (
                      <ChevronRightIcon className='h-4 font-medium' />
                    )}
                  </div>
                  <h2 className='h-7 font-bold'> {label}</h2>
                </div>
                {isCollapsed && <TreeChildView items={children} />}
              </div>
            </li>
          </ul>
        ))}
    </div>
  );
}
