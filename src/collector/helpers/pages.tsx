import * as Tripetto from "tripetto-collector";
import * as React from "react";
import { IBlockRenderer } from "./interfaces/renderer";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

export const pages = (storyline: Tripetto.Storyline<IBlockRenderer>) => {
    const p = storyline.pages;

    return (
        p.length > 0 && (
            <Grid item>
                {p.map((page: Tripetto.IPage) => (
                    <Button
                        key={page.number}
                        variant={page.active ? "contained" : "outlined"}
                        color="secondary"
                        size="small"
                        style={{
                            marginRight: 8
                        }}
                        onClick={() => page.activate()}
                    >
                        {page.number}
                    </Button>
                ))}
            </Grid>
        )
    );
};
