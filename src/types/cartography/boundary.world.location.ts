import Coordinate from "../coordinate";
import WorldLocation from "./world.location";

export default class BoundaryWorldLocation extends WorldLocation {
    bounds: Coordinate[] | undefined;
}