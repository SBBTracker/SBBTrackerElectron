import React from "react";
import {createRoot} from "react-dom/client"
import Root from "Core/root";

const root_element = document.getElementById('root')
const root = createRoot(root_element)

root.render(
  <div>
      <Root></Root>
  </div>
)
