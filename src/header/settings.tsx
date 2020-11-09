import * as React from "react";
import { TModes } from "tripetto-collector";
import { Collector } from "../collector/collector";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import Switch from "@material-ui/core/Switch";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";

export const settingsModal = (collector: Collector, fnClose: () => void) => (
    <Dialog fullWidth open onClose={fnClose} aria-labelledby="alert-dialog-title" style={{ left: "50%" }}>
        <DialogTitle id="alert-dialog-title">
            <Typography component="span" variant="h4">
                Settings
            </Typography>
        </DialogTitle>
        <DialogContent>
            <Typography component="span" variant="h6">
                Mode
            </Typography>
            <FormControl>
                <RadioGroup
                    name="mode"
                    value={collector.blocks.mode}
                    onChange={(e: {}, mode: string) => (collector.blocks.mode = mode as TModes)}
                >
                    <FormControlLabel key="paginated" value="paginated" control={<Radio color="primary" />} label="Paginated" />
                    <FormControlLabel key="continuous" value="continuous" control={<Radio color="primary" />} label="Continuous" />
                    <FormControlLabel key="progressive" value="progressive" control={<Radio color="primary" />} label="Progressive" />
                </RadioGroup>
            </FormControl>
            <Typography component="span" variant="h6" style={{ marginTop: 20 }}>
                Display
            </Typography>
            <FormGroup>
                <FormControlLabel
                    control={
                        <Switch
                            id="enumerators"
                            color="primary"
                            defaultChecked={collector.settings.enumerators}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                collector.changeSettings({
                                    enumerators: e.target.checked
                                })
                            }
                        />
                    }
                    label="Enumerators"
                />
            </FormGroup>
            {collector.blocks.mode === "paginated" && (
                <FormGroup>
                    <FormControlLabel
                        control={
                            <Switch
                                id="pages"
                                color="primary"
                                defaultChecked={collector.settings.pages}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                    collector.changeSettings({
                                        pages: e.target.checked
                                    })
                                }
                            />
                        }
                        label="Page navigation"
                    />
                </FormGroup>
            )}
            <FormGroup>
                <FormControlLabel
                    control={
                        <Switch
                            id="progressbar"
                            color="primary"
                            defaultChecked={collector.settings.progressbar}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                collector.changeSettings({
                                    progressbar: e.target.checked
                                })
                            }
                        />
                    }
                    label="Progressbar"
                />
            </FormGroup>
        </DialogContent>
        <DialogActions>
            <Button onClick={fnClose} color="primary" autoFocus>
                Close
            </Button>
        </DialogActions>
    </Dialog>
);
