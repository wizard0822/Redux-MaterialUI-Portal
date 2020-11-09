import * as React from "react";
import * as Tripetto from "tripetto-collector";
import { Blocks } from "./helpers/blocks";
import { ICollectorProps } from "./helpers/interfaces/props";
import { ICollectorSettings } from "./helpers/interfaces/settings";
import blue from "@material-ui/core/colors/blue";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import Grid from "@material-ui/core/Grid";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import Typography from "@material-ui/core/Typography";
import "./blocks";
import "./collector.less";

export class Collector extends React.PureComponent<ICollectorProps> {
    /** Contains the blocks renderer instance. */
    readonly blocks = new Blocks(this.props.definition, this.props.mode || "paginated", this.props.snapshot, this.props.preview);

    /** Contains some settings for the collector (they can be changed during runtime). */
    readonly settings: ICollectorSettings = {
        enumerators: Tripetto.castToBoolean(this.props.enumerators),
        pages: Tripetto.castToBoolean(this.props.pages),
        progressbar: Tripetto.castToBoolean(this.props.progressbar)
    };

    /** Render our collector. */
    render(): React.ReactNode {
        return (
            <MuiThemeProvider
                theme={createMuiTheme({
                    palette: {
                        primary: blue,
                        secondary: blue
                    }
                })}
            >
                <Grid container direction="column" style={{ padding: "24px" }}>
                    {this.blocks.render(this.settings) ||
                        ((this.blocks.status === "empty" || this.blocks.status === "preview") && (
                            <Grid item>
                                <Typography variant="h5" color="inherit">
                                    👋 Nothing to show here yet
                                </Typography>
                                <Typography variant="subtitle1" color="inherit">
                                    Add blocks to the form first to get the magic going.
                                </Typography>
                            </Grid>
                        )) ||
                        (this.blocks.status === "finished" && (
                            <Grid item>
                                <Typography variant="h5" color="inherit">
                                    ✔ You’ve completed the form
                                </Typography>
                                <Typography variant="subtitle1" color="inherit">
                                    For the purpose of this demo the form output is visible in your browser’s developer console. Go there to
                                    see the collected data.
                                </Typography>
                            </Grid>
                        )) ||
                        (this.blocks.status === "stopped" && (
                            <Grid item>
                                <Typography variant="h5" color="inherit">
                                    ⏹ You’ve stopped the form
                                </Typography>
                                <Typography variant="subtitle1" color="inherit">
                                    Press the play icon to start a new session.
                                </Typography>
                            </Grid>
                        )) ||
                        (this.blocks.status === "paused" && (
                            <Grid item>
                                <Typography variant="h5" color="inherit">
                                    ⏸ You’ve paused the form
                                </Typography>
                                <Typography variant="subtitle1" color="inherit">
                                    For the purpose of this demo the paused form is saved in your browser’s local store. Refresh the browser
                                    to resume the paused form.
                                </Typography>
                            </Grid>
                        )) || (
                            <Grid item>
                                <Typography variant="h5" color="inherit">
                                    ⏹ You haven’t started the form yet
                                </Typography>
                                <Typography variant="subtitle1" color="inherit">
                                    Press the play icon to start a new session.
                                </Typography>
                            </Grid>
                        )}
                </Grid>
            </MuiThemeProvider>
        );
    }

    /** Bind to some events. */
    componentDidMount(): void {
        this.blocks.onChange = () => {
            // Since the collector has the actual state, we need to update the component.
            // We are good React citizens. We only do this when necessary!
            this.forceUpdate();

            // If the `update` prop contains a ref of another component, update that component as well.
            if (this.props.update && this.props.update.current) {
                this.props.update.current.forceUpdate();
            }
        };

        this.blocks.onFinish = (instance: Tripetto.Instance) => {
            if (this.props.onFinish) {
                this.props.onFinish(instance);
            }
        };
    }

    /** Change settings. */
    changeSettings(settings: Partial<ICollectorSettings>): void {
        this.settings.enumerators = Tripetto.isBoolean(settings.enumerators) ? settings.enumerators : this.settings.enumerators;
        this.settings.pages = Tripetto.isBoolean(settings.pages) ? settings.pages : this.settings.pages;
        this.settings.progressbar = Tripetto.isBoolean(settings.progressbar) ? settings.progressbar : this.settings.progressbar;

        this.forceUpdate();
    }
    /** Start the collector. */
    start(): void {
        this.blocks.start();
    }

    /** Pauses the collector. */
    pause(): Tripetto.ISnapshot | undefined {
        const snapshot = this.blocks.pause() as Tripetto.ISnapshot;

        if (snapshot && this.props.onPause) {
            this.props.onPause(snapshot);
        }

        return snapshot;
    }

    /** Stop the collector. */
    stop(): void {
        this.blocks.stop();
    }

    /** Resets the collector. */
    reset(): void {
        this.blocks.restart(false);
    }

    /** Reloads with a new definition. */
    reload(definition: Tripetto.IDefinition): void {
        this.blocks.reload(definition);
    }
}
