import * as Tripetto from "tripetto-collector";
import * as React from "react";
import { IBlockRenderer } from "./interfaces/renderer";
import Grid from "@material-ui/core/Grid";
import LinearProgress from "@material-ui/core/LinearProgress";

export const progressbar = (storyline: Tripetto.Storyline<IBlockRenderer>) => {
    return (
        <Grid item>
            <LinearProgress variant="determinate" value={storyline.percentage} />
        </Grid>
    );
};
