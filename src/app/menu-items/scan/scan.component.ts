import { Component, OnInit } from '@angular/core';
import { BarcodeFormat } from '@zxing/library';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.component.html',
  styleUrls: ['./scan.component.css']
})
export class ScanComponent implements OnInit {

  torchEnabled = false;
  tryHarder = false;
  currentDevice: MediaDeviceInfo = null;
  formats = [BarcodeFormat.QR_CODE];
  availableDevices: MediaDeviceInfo[];
  hasPermission: boolean = null;
  data: string = null;

  constructor(private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  onPermissionResponse(permission: boolean) {
    this.hasPermission = permission;
  }

  onCamerasFound(devices: MediaDeviceInfo[]) {
    this.availableDevices = devices;
  }

  onScanSuccess(data: string) {
    this.data = data;
    this.router.navigate(['/item/' + data]);
    this.openSnackBar("Found QR code.")
  }

  openSnackBar(message) {
    this.snackBar.open(message, 'OK', {
      duration: 3000,
      panelClass: ['my-snack-bar']
    });
  }

}
