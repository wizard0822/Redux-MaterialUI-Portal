import * as React from "react";
import { Editor } from "tripetto";
import { Collector } from "../collector/collector";
import { Blocks } from "../collector/helpers/blocks";
import { settingsModal } from "./settings";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import blue from "@material-ui/core/colors/blue";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import PlayIcon from "@material-ui/icons/PlayArrowRounded";
import PauseIcon from "@material-ui/icons/PauseRounded";
import StopIcon from "@material-ui/icons/StopRounded";
import CodeIcon from "@material-ui/icons/CodeRounded";
import ReadmeIcon from "@material-ui/icons/DescriptionRounded";
import ResetIcon from "@material-ui/icons/ReplayRounded";
import "./header.less";

export class Header extends React.PureComponent<
    {
        collector: React.RefObject<Collector>;
        editor: Editor;
        reset: () => void;
    },
    {
        settings: boolean;
    }
> {
    private get collector(): Collector {
        if (this.props.collector.current instanceof Collector) {
            return this.props.collector.current;
        }

        throw new Error("Collector ref is not available!");
    }

    private get blocks(): Blocks {
        return this.collector.blocks;
    }

    state = {
        settings: false
    };

    settings(open: boolean): void {
        this.setState({ settings: open });
    }

    render(): React.ReactNode {
        return (
            <MuiThemeProvider
                theme={createMuiTheme({
                    palette: {
                        primary: blue
                    }
                })}
            >
                <AppBar position="absolute" color="default">
                    <Grid
                        container
                        wrap="nowrap"
                        justify="space-between"
                        style={{
                            padding: 12
                        }}
                    >
                        <Grid item>
                            <Grid container>
                                <Grid item>
                                    <Typography
                                        variant="h6"
                                        color="inherit"
                                        style={{
                                            marginTop: 3,
                                            marginRight: 4
                                        }}
                                    >
                                        React + Material-UI
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Button
                                        color="primary"
                                        size="small"
                                        href="https://gitlab.com/tripetto/examples/react-material-ui"
                                        target="_blank"
                                    >
                                        <CodeIcon style={{ marginRight: 3 }} />
                                        Get source
                                    </Button>
                                    <Button
                                        color="primary"
                                        size="small"
                                        href="https://gitlab.com/tripetto/examples/react-material-ui/blob/master/README.md"
                                        target="_blank"
                                    >
                                        <ReadmeIcon style={{ marginRight: 3 }} />
                                        View readme
                                    </Button>
                                    <Button color="primary" size="small" onClick={() => this.props.reset()}>
                                        <ResetIcon style={{ marginRight: 3 }} />
                                        Reset demo
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item>
                            {!this.blocks.preview && (
                                <>
                                    <Button
                                        variant="outlined"
                                        color="inherit"
                                        size="small"
                                        title="Start form"
                                        disabled={this.blocks.isEmpty || (!this.blocks.isStopped && !this.blocks.isFinished)}
                                        onClick={() => this.collector.start()}
                                        style={{
                                            borderRight: "none",
                                            borderTopRightRadius: 0,
                                            borderBottomRightRadius: 0,
                                            height: 39
                                        }}
                                    >
                                        <PlayIcon />
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        color="inherit"
                                        size="small"
                                        title="Pause form"
                                        disabled={!this.blocks.isRunning}
                                        onClick={() => this.collector.pause()}
                                        style={{
                                            borderRadius: 0,
                                            height: 39
                                        }}
                                    >
                                        <PauseIcon />
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        color="inherit"
                                        size="small"
                                        title="Stop form"
                                        disabled={!this.blocks.isRunning}
                                        onClick={() => this.collector.stop()}
                                        style={{
                                            borderLeft: "none",
                                            borderTopLeftRadius: 0,
                                            borderBottomLeftRadius: 0,
                                            height: 39,
                                            marginRight: 10
                                        }}
                                    >
                                        <StopIcon />
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        color="inherit"
                                        onClick={() => this.settings(true)}
                                        style={{
                                            marginRight: 10,
                                            height: 39
                                        }}
                                    >
                                        Settings
                                    </Button>
                                </>
                            )}
                            <Button
                                variant={!this.blocks.preview ? "contained" : "outlined"}
                                color="primary"
                                onClick={() => (this.blocks.preview = false)}
                                style={{
                                    borderRight: "none",
                                    borderTopRightRadius: 0,
                                    borderBottomRightRadius: 0,
                                    height: 39
                                }}
                            >
                                Collect
                            </Button>
                            <Button
                                variant={this.blocks.preview ? "contained" : "outlined"}
                                color="primary"
                                onClick={() => (this.blocks.preview = true)}
                                style={{
                                    borderLeft: "none",
                                    borderTopLeftRadius: 0,
                                    borderBottomLeftRadius: 0,
                                    height: 39
                                }}
                            >
                                Preview
                            </Button>
                        </Grid>
                    </Grid>
                </AppBar>
                {this.state.settings && settingsModal(this.collector, () => this.settings(false))}
            </MuiThemeProvider>
        );
    }
}
