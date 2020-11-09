import * as Tripetto from "tripetto-collector";
import { IBlockHelper } from "./helper";

export interface IBlockRenderer extends Tripetto.NodeBlock {
    render: (h: IBlockHelper) => React.ReactNode;
}
