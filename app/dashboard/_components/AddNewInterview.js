"use client";

import React, { useState, useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";

const AddNewInterview = () => {
  const [open, setOpen] = useState(false);

  // Ensuring the dialog only renders client-side
  useEffect(() => {
    setOpen(true);
  }, []);

  return (
    <div>
      <div
        className="p-1 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md hover:cursor-pointer transition-all"
        onClick={() => {
          console.log("user clicked");
          setOpen(true);
        }}
      >
        <h2 className="font-bold text-lg text-center">+ Add New</h2>
      </div>

      {/* Dialog will only render on the client */}
      {open && (
        <Dialog>
          <Dialog.Portal>
            <Dialog.Overlay className="DialogOverlay" />
            <Dialog.Content className="DialogContent">
              <Dialog.Title className="DialogTitle">Edit profile</Dialog.Title>
              <Dialog.Description className="DialogDescription">
                Make changes to your profile here. Click save when you're done.
              </Dialog.Description>
              <fieldset className="Fieldset">
                <label className="Label" htmlFor="name">
                  Name
                </label>
                <input
                  className="Input"
                  id="name"
                  defaultValue="Pedro Duarte"
                />
              </fieldset>
              <fieldset className="Fieldset">
                <label className="Label" htmlFor="username">
                  Username
                </label>
                <input
                  className="Input"
                  id="username"
                  defaultValue="@peduarte"
                />
              </fieldset>
              <div
                style={{
                  display: "flex",
                  marginTop: 25,
                  justifyContent: "flex-end",
                }}
              >
                <Dialog.Close asChild>
                  <button className="Button green">Save changes</button>
                </Dialog.Close>
              </div>
              <Dialog.Close asChild>
                <button className="IconButton" aria-label="Close">
                  x
                </button>
              </Dialog.Close>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog>
      )}
    </div>
  );
};

export default AddNewInterview;
