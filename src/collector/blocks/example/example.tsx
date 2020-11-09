import * as React from "react";
import * as Tripetto from "tripetto-collector";
import { IBlockRenderer } from "../../helpers/interfaces/renderer";
import { IBlockHelper } from "../../helpers/interfaces/helper";

@Tripetto.block({
    type: "node",
    identifier: "example"
})
export class TextBlock extends Tripetto.NodeBlock implements IBlockRenderer {
    readonly exampleSlot = Tripetto.assert(this.valueOf("example-slot"));
    readonly required = this.exampleSlot.slot.required || false;

    render(h: IBlockHelper): React.ReactNode {
        return (
            <>
                {h.name(this.required, this.key())}
                {h.description}
                <div
                    onClick={() => this.exampleSlot.set("A nice value!")}
                    style={{
                        color: "red"
                    }}
                >
                    This is an example block with an example data slot that can be set. If the block is required, the validation will pass
                    as soon as the value is set.
                    <br />
                    Current value of example slot: <b>{this.exampleSlot.string || "Not set"}</b> (click here to set a value)
                </div>
                {h.explanation}
            </>
        );
    }
}
