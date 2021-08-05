import {Injectable} from "@angular/core";
import {HttpService} from "../http.service";
import {environment} from 'src/environments/environment';
import {Paginated} from "../../types/paginated.type";
import {UserModel} from "../../models/user.model";
import {Observable} from "rxjs";
import {PostModel} from "../../models/post.model";
import {map} from "rxjs/operators";

@Injectable()
export class UserHttpService extends HttpService {
  private readonly baseApiUrl = environment.baseApiUrl + '/users';

  getUser(id: number | null): Observable<UserModel> {
    return this.get(this.baseApiUrl + '/' + id).pipe(
      map((response: any) => (response.data))
    )
  }

  getUsers(params: {
    page?: number;
    name?: string;
  } = {}): Observable<Paginated<UserModel>> {
    return this.get<Paginated<UserModel>>(this.baseApiUrl, this.buildParameters(params));
  }

  getUserPosts(userId: number | null): Observable<Paginated<PostModel>> {
    return this.get<Paginated<PostModel>>(this.baseApiUrl + '/' + userId + '/posts');
  }
}
