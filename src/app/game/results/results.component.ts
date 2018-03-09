import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Result } from '../_SharedData/result.model';

import { GameService } from '../_SharedData/game.service';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultsComponent implements OnInit, AfterViewInit {
  columns: string[];
  dataSource: MatTableDataSource<Result>;
  pageSize: number;

  @ViewChild(MatPaginator) paginator: MatPaginator
  @ViewChild(MatSort) sort: MatSort

  constructor(private gameService: GameService) {
  }

  ngOnInit() {
    
    this.columns = ['level', 'nickname', 'score', 'comment', 'date'];
    this.pageSize = 10;
    this.gameService.getResults().subscribe(res => {
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator
      this.dataSource.sort = this.sort
    })
  }
  ngAfterViewInit() {
    
  }

  applyFilter(text: string) {
    text = text.trim().toLowerCase();
    this.dataSource.filter = text;
  }

}
