import { Component, OnInit } from '@angular/core';
import { LeaveForm } from '../shared/model/leave-application-form.model';
import { LeaveService } from '../shared/service/leave-application-form.service';

@Component({
  selector: 'app-hod-dashboard',
  templateUrl: './hod-dashboard.component.html',
  styleUrls: ['./hod-dashboard.component.css']
})
export class HodDashboardComponent implements OnInit {
  leaveDataList: LeaveForm[] = [];

  constructor(private leaveService: LeaveService) {}

  ngOnInit() {
    // Subscribe to the leaveSub BehaviorSubject in the LeaveService
    this.leaveService.leaveSub.subscribe((leaveDataList) => {
      this.leaveDataList = leaveDataList;
    });

    // Fetch the leave data from Firebase
    this.leaveService.getLeavesFromFirebase().subscribe((leavesObject) => {
      this.leaveDataList = leavesObject;
      console.log(this.leaveDataList);
    });
  }

  approveLeave(leave: LeaveForm) {
    this.leaveService.updateLeaveStatus(leave, 'Approved').subscribe(() => {
      console.log('Leave status updated to Approved');
    }, (error) => {
      console.error('Error updating leave status:', error);
    });
  }

  rejectLeave(leave: LeaveForm) {
    this.leaveService.updateLeaveStatus(leave, 'Rejected').subscribe(() => {
      console.log('Leave status updated to Rejected');
    }, (error) => {
      console.error('Error updating leave status:', error);
    });
  }
}
