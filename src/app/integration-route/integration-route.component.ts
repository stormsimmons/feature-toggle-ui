import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-integration-route',
  templateUrl: './integration-route.component.html',
  styleUrls: ['./integration-route.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class IntegrationRouteComponent implements OnInit {
  public date: number = new Date().getTime();

  public ENVIRONMENT = environment;

  // public programmingLanguages: Array<Array<string>> = [
  //   ['C++', 'CSharp (C#)'],
  //   ['Go', 'Java'],
  //   ['JavaScript', 'Kotlin'],
  //   ['Objective-C', 'PowerShell'],
  //   ['Python', 'Ruby'],
  //   ['Swift'],
  // ];

  public programmingLanguages: Array<Array<string>> = [['CSharp (C#)', 'Python']];

  public text = {
    'C++': '',
    'CSharp (C#)': `<p><span class="keyword">var</span>&nbsp;url&nbsp;=&nbsp;<span class="string">"&#x3C;url&#x3E;"</span>;</p><p> <span class="keyword">var</span>&nbsp;httpClient&nbsp;=&nbsp;<span class="keyword">new</span>&nbsp; <span class="method">HttpClient()</span>;</p><p> <span class="keyword">var</span>&nbsp;response&nbsp;=&nbsp;<span class="keyword">await</span >&nbsp;httpClient.<span class="method">GetAsync</span>(url);</p><p> <span class="keyword">var</span>&nbsp;json&nbsp;=&nbsp;<span class="keyword">await</span >&nbsp;response.Content.<span class="method">ReadAsStringAsync</span>();</p><p> <span class="keyword">var</span>&nbsp;enabled&nbsp;=&nbsp;JsonConvert.<span class="method" >DeserializeObject</span >&#x3C;<span class="keyword">bool</span>&#x3E;(json);</p><p><span class="keyword">if</span>&nbsp;(enabled)</p><p>&#123;</p><p> &nbsp;&nbsp;Console.<span class="method">WriteLine</span>(<span class="string" >"Feature Toggle is enabled"</span >);</p><p>&#125;&nbsp;<span class="keyword">else</span></p><p>&#123;</p><p> &nbsp;&nbsp;Console.<span class="method">WriteLine</span>(<span class="string" >"Feature Toggle is disabled"</span >);</p><p>&#125;</p>`,
    Go: '',
    Java: '',
    JavaScript: '',
    Kotlin: '',
    'Objective-C': '',
    PowerShell: '',
    Python: `<p>response&nbsp;=&nbsp;requests.get('&#x3C;url&#x3E;')</p><p><span class="keyword">if</span>&nbsp;response.json():</p><p>&nbsp;&nbsp;<span class="method">print</span>('Feature Toggle is enabled')</p><p><span class="keyword">else</span>:</p><p>&nbsp;&nbsp;<span class="method">print</span>('Feature Toggle is disabled')</p>`,
    Ruby: '',
    Swift: '',
  };

  constructor() {}

  public ngOnInit(): void {}
}
