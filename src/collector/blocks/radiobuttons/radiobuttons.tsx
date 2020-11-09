import * as React from "react";
import * as Tripetto from "tripetto-collector";
import { IRadiobutton, Radiobuttons } from "tripetto-block-radiobuttons/collector";
import { IBlockRenderer } from "../../helpers/interfaces/renderer";
import { IBlockHelper } from "../../helpers/interfaces/helper";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";

@Tripetto.block({
    type: "node",
    identifier: "tripetto-block-radiobuttons"
})
export class RadiobuttonsRenderer extends Radiobuttons implements IBlockRenderer {
    render(h: IBlockHelper): React.ReactNode {
        return (
            <>
                {h.name(this.required)}
                {h.description}
                <FormControl>
                    <RadioGroup
                        value={this.value}
                        onChange={(e: {}, value: string) => {
                            this.value = value;
                        }}
                    >
                        {this.props.buttons.map((radiobutton: IRadiobutton) => (
                            <FormControlLabel
                                key={this.key(radiobutton.id)}
                                value={radiobutton.id}
                                control={<Radio />}
                                label={radiobutton.name}
                            />
                        ))}
                    </RadioGroup>
                    {h.explanation && <FormHelperText>{h.explanation}</FormHelperText>}
                </FormControl>
            </>
        );
    }
}
