import * as Tripetto from "tripetto-collector";
import * as React from "react";
import { ICollectorSettings } from "./interfaces/settings";
import { IBlockRenderer } from "./interfaces/renderer";
import { markdownToJSX } from "./markdown";
import { buttons } from "./buttons";
import { progressbar } from "./progressbar";
import { pages } from "./pages";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

export class Blocks extends Tripetto.Collector<IBlockRenderer> {
    render(settings: ICollectorSettings): React.ReactNode {
        const storyline = this.storyline;

        return (
            storyline &&
            !storyline.isEmpty && (
                <>
                    {storyline.map((moment: Tripetto.Moment<IBlockRenderer>, momentIndex: number) =>
                        moment.nodes.map((node: Tripetto.IObservableNode<IBlockRenderer>, nodeIndex: number) =>
                            node.block ? (
                                <Grid item key={node.key}>
                                    {node.block.render({
                                        name: (required?: boolean) =>
                                            Tripetto.isString(node.props.name) &&
                                            Tripetto.castToBoolean(node.props.nameVisible, true) && (
                                                <Typography variant="h6" color="inherit" style={{ fontWeight: "normal" }}>
                                                    {settings.enumerators && node.enumerator && `${node.enumerator}. `}
                                                    {markdownToJSX(node.props.name || "...", node.context)}
                                                    {required && <span className="required">*</span>}
                                                </Typography>
                                            ),
                                        label: (required?: boolean) => (
                                            <>
                                                {markdownToJSX(node.props.name || "...", node.context, false)}
                                                {required && <span className="required">*</span>}
                                            </>
                                        ),
                                        get description(): React.ReactNode {
                                            return (
                                                node.props.description && (
                                                    <Typography variant="subtitle1" color="inherit" style={{ paddingTop: "8px" }}>
                                                        {markdownToJSX(node.props.description, node.context)}
                                                    </Typography>
                                                )
                                            );
                                        },
                                        get explanation(): React.ReactNode {
                                            return node.props.explanation && markdownToJSX(node.props.explanation, node.context);
                                        },
                                        get placeholder(): string {
                                            return Tripetto.markdownifyToString(node.props.placeholder || "", node.context, "...");
                                        }
                                    })}
                                </Grid>
                            ) : (
                                <Grid
                                    item
                                    key={node.key}
                                    style={{
                                        marginTop: momentIndex === 0 && nodeIndex === 0 ? 0 : 32
                                    }}
                                >
                                    {Tripetto.castToBoolean(node.props.nameVisible, true) && (
                                        <Typography variant="h5" color="inherit">
                                            {markdownToJSX(node.props.name || "...", node.context)}
                                        </Typography>
                                    )}
                                    {node.props.description && (
                                        <Typography variant="subtitle1" color="inherit">
                                            {markdownToJSX(node.props.description, node.context, true)}
                                        </Typography>
                                    )}
                                </Grid>
                            )
                        )
                    )}

                    {!this.isPreview && (
                        <>
                            <Divider variant="fullWidth" />
                            <Grid container direction="column" style={{ padding: "24px 0" }}>
                                {settings.progressbar && progressbar(storyline)}
                                {buttons(storyline)}
                                {settings.pages && pages(storyline)}
                            </Grid>
                        </>
                    )}
                </>
            )
        );
    }
}
