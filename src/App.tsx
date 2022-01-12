import { Input } from "components/Input";
import React from "react";

/**
 * TODO: Components needed
 *  - Header
 *  - Input
 *  - Task card
 *  - Task card buttons
 *  - Menu Icon Buttons
 *    - search
 *    - tasks
 *    - stats
 *  - Button Action
 *  - Timer
 * */

function App() {
  return (
    <>
      <div className="bg-primary">
        <Input id="test" name="test" placeholder="hello" type="text" />;
      </div>
    </>
  );
}

export default App;
