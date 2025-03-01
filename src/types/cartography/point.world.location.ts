import Coordinate from "../coordinate";
import WorldLocation from "./world.location";

export default class PointWorldLocation extends WorldLocation {
    point: Coordinate | undefined;
}