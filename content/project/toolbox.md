---
title: ToolBox
---


Toolbox
=======

We spent a lot of time shopping for the best tools to ease the pains in development and release management. Here is the toolbox we are currently comfortable with. This list may be updated over time as we gain more experiences and insights.

* Code Quality and Release Management
    * **Maven**: Dependency / Build
    * **TestNG**: Unit Test
    * **JaCoCo**: Java Code Coverage
    * **Sonar**: Code Quality
    * **Git/GitHub**: Version Control
    * **Travis-ci**: Continuous Integration
* Website   
    * **Nanoc**: MarkDown to HTML compiler
    * **Guard**: File Monitoring
    * **CodeRay**: Code Highlighting
    * **MathJax**: Math Formula Rendering
    * **Integrity**: Detect Broken Links
    * **Google Analytics**: Traffic Monitoring
    * **Google Webmaster**: Webmaster
* GUI
    * **Node.js / Express.js**: Server and server side MVC framework
    * **Angular.js**: Client side MVC framework
    * **Sock.io**: Server-Client Communication
    * **D3.js**: Data Visualization
    * **BootStrap**: CSS Framework
* Deployment
    * **Apache Ambari**: Hadoop Cluster Management
    * **OpenStack**: Could



Code Quality and Release Management
-----------------------------------

### **Maven**: Dependency / Build

Gradel might be supported in the future


### **TestNG**: Unit Test

We chose ``TestNG`` over ``JUnit`` for no specific reasons...

[Learn More](http://testng.org/doc/index.html)

### **JaCoCo**: Java Code Coverage

To use ``jacoco``, add the ``jacoco-maven-plugin`` to the ``pom``

    #!xml
    <plugin>
        <groupId>org.jacoco</groupId>
        <artifactId>jacoco-maven-plugin</artifactId>
        <version>0.7.1.201405082137</version>
        <executions>
            <execution>
                <id>jacoco-prepare-agent</id>
                <goals>
                    <goal>prepare-agent</goal>
                </goals>
            </execution>
            <execution>
                <id>jacoco-report</id>
                <goals>
                    <goal>report</goal>
                </goals>
            </execution>
        </executions>
    </plugin>

To build

    $ mvn clean package

* ``prepare-agent``: generate result in ``target/jacoco.exec``
* ``report``: create report based on ``jacoco.exec``, into ``target/site/jacoco``

### **Sonar**: Code Quality

Install ``SonarQube``: http://www.sonarqube.org/

Run through ``Maven``:

    $ mvn sonar:sonar

To add params:

    $ mvn sonar:sonar -Dsonar.host.url=http://x.x.x.x:8080/ -Dsonar.jdbc.url=jdbc:mysql://x.x.x.x:3306/<db_name> -Dsonar.jdbc.username=<user_name> -Dsonar.jdbc.password=<password>


### **Git/GitHub**: Version Control

https://github.com/shifuml

### **Travis-ci**: Continuous Integration

Go to Travis-ci [website](https://travis-ci.org/), login by GitHub account.





Website
-------

### **Nanoc**: MarkDown to HTML compiler

http://nanoc.ws/

### **Guard**: File Monitoring

https://github.com/guard/guard

### **CodeRay**: Code Highlighting

https://github.com/rubychan/coderay

### **MathJax**: Math Formula Rendering

http://www.mathjax.org/

Add this to HTML

    #!html
    <script type="text/javascript" src="http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML">

### **Integrity**: Detect Broken Links 

http://peacockmedia.co.uk/integrity/

### **Google Analytics**: Traffic Monitoring

http://www.google.com/analytics

### **Google Webmaster**: Webmaster

http://www.google.com/webmasters/



GUI
----

### **Node.js / Express.js**: Server and server side MVC framework

http://nodejs.org/

http://expressjs.com/

### **Angular.js**: Client side MVC framework

https://angularjs.org/

### **Sock.io**: Server-Client Communication

http://socket.io/

### **D3.js**: Data Visualization

http://d3js.org/

### **BootStrap**: CSS Framework

http://getbootstrap.com/

Deployment
-----------

### **Apache Ambari**: Hadoop Cluster Management

http://ambari.apache.org/

### **OpenStack**: Cloud

http://www.openstack.org/

Amazon AWS might be supported in the future