import { Pipe, PipeTransform } from "@angular/core";

@Pipe ({
    name: 'replaceStringWithString'
})
export class ReplaceStringWithStringPipe implements PipeTransform {

    transform(value: string, replaceString: string, replaceWith: string): string {
        return value.replace(replaceString, replaceWith);
    }
}