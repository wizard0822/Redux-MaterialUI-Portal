import * as Tripetto from "tripetto-collector";
import * as React from "react";
import { IBlockRenderer } from "./interfaces/renderer";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import BackIcon from "@material-ui/icons/NavigateBeforeRounded";
import NextIcon from "@material-ui/icons/NavigateNextRounded";
import CompleteIcon from "@material-ui/icons/CheckCircleRounded";

export const buttons = (storyline: Tripetto.Storyline<IBlockRenderer>) => {
    return (
        <Grid item>
            <Grid container spacing={8} justify="space-between">
                {storyline.mode === "progressive" ? (
                    <Grid item>
                        <Button variant="contained" color="secondary" disabled={!storyline.isFinishable} onClick={() => storyline.finish()}>
                            Complete
                            <CompleteIcon
                                style={{
                                    marginLeft: "15px"
                                }}
                            />
                        </Button>
                    </Grid>
                ) : (
                    <>
                        {!storyline.isAtStart && (
                            <Grid item>
                                <Button variant="contained" disabled={storyline.isAtStart} onClick={() => storyline.stepBackward()}>
                                    <BackIcon
                                        style={{
                                            marginRight: "15px"
                                        }}
                                    />
                                    Back
                                </Button>
                            </Grid>
                        )}
                        <Grid item>
                            <Button
                                variant="contained"
                                color={storyline.isAtFinish ? "secondary" : "primary"}
                                disabled={storyline.isFailed || (storyline.isAtFinish && !storyline.isFinishable)}
                                onClick={() => storyline.stepForward()}
                            >
                                {storyline.isAtFinish ? "Complete" : "Next"}
                                {storyline.isAtFinish ? (
                                    <CompleteIcon
                                        style={{
                                            marginLeft: "15px"
                                        }}
                                    />
                                ) : (
                                    <NextIcon
                                        style={{
                                            marginLeft: "15px"
                                        }}
                                    />
                                )}
                            </Button>
                        </Grid>
                    </>
                )}
            </Grid>
        </Grid>
    );
};
