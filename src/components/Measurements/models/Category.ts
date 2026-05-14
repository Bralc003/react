import { MeasurementEntry } from "@/components/Measurements/models/Entry";
import { Adapter } from "@/core/lib/Adapter";

export class MeasurementCategory {

    entries: MeasurementEntry[] = [];

    constructor(
        public id: number,
        public name: string,
        public unit: string,
        public group_id: string,
        public group_name: string,
        entries?: MeasurementEntry[]
    ) {
        if (entries) {
            this.entries = entries;
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static fromJson(json: any): MeasurementCategory {
        return adapter.fromJson(json);
    }

    toJson() {
        return adapter.toJson(this);
    }
}


class MeasurementCategoryAdapter implements Adapter<MeasurementCategory> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fromJson(item: any) {
        return new MeasurementCategory(
            item.id,
            item.name,
            item.unit,
            item.group_id,
            item.group_name
        );
    }

    toJson(item: MeasurementCategory) {
        return {
            id: item.id,
            name: item.name,
            unit: item.unit,
            group_id: item.group_id,
            group_name: item.group_name
        };
    }
}

const adapter = new MeasurementCategoryAdapter();